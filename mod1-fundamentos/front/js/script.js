let allUsers = [];
let userList = [];
let userStats = [];

window.addEventListener('load', start);

function start () {
  fetchDB();
  userSearch();
}

async function fetchDB() {
  const res = await fetch('https://api.mocki.io/v1/58112d11');
  const json = await res.json();
  
  allUsers = json.users.map(user => {
    const { name, picture, dob, gender } = user;
    return {
      name: name.first + ' ' + name.last,
      picture: picture.thumbnail,
      age: dob.age,
      gender
    };
  });
}

function userSearch() {
  inputSearch.addEventListener('keyup', (key) => {
    if(key.target.value !== '') {
      userList = userFilter(key.target.value);
      render();
    } else {
      userList = [];
      render();
    };
  })
}

function userFilter(search) {
  let res = allUsers.filter(user => user.name.toLowerCase().includes(search.toLowerCase()));
  return res.sort((a,b) => {
    return a.name > b.name ? a.name < b.name ? 0 : 1: -1;
  });
};

function calculateStats() {
  
  return {
    sumOfAllAges: sumAllAges(),
    averageOfAllAges: averageAge(),
    genders: checkGender()
  }

  function sumAllAges() {
    let totalAges = userList.reduce((acc,curr) => {
      return acc+curr.age;
    },0)
    return totalAges;
  }
  
  function averageAge() {
    let sumAge = sumAllAges();
    let ageAverage = sumAge / userList.length;
    if(sumAge !== 0) {
      return ageAverage.toFixed(2);
    }
    return 0;
  }

  function checkGender() {
    let resp = {
      female: 0,
      male: 0
    }
    userList.filter(user => {
      if(user.gender === "female") {
        resp.female++;
      } else {
        resp.male++;
      }
    })
    return resp;
  }

};

function render() {
  renderUsersFinded();
  renderUserStats();
}

function renderUsersFinded() {
  if(userList.length !== 0) {
    userFindedList.innerHTML = '';

    let totalFindedUser = document.createElement('li');
    totalFindedUser.classList.add("class","text-2xl");
    totalFindedUser.classList.add("class","p-5");
    totalFindedUser.appendChild(document.createTextNode(`${userList.length} usuário(s) encontrado(s)`));
    userFindedList.appendChild(totalFindedUser);

    userList.forEach(user => {
      let li = document.createElement('li');
      li.innerHTML = `
        <div class="flex flex-wrap items-center p-1">
          <div>
           <img src="${user.picture}" class="userAvatar" />
          </div>
          <div class="px-3 content-center">
            <p>${user.name}, ${user.age}</p>
          </div>
        </div>
      `;
      userFindedList.appendChild(li);
    });
  } else {
    userFindedList.innerHTML = '<li class="text-2xl p-5">Nenhum usuário filtrado</li>';
  }
};

function renderUserStats () {
  if(userList.length !== 0) {
    userStatsList.innerHTML = '';
    userStatsList.innerHTML = '<li class="text-2xl p-5">Estatísticas</li>';
    let stats = calculateStats();
    let li = document.createElement('li');
    li.innerHTML = `
      <li>Sexo masculino: <span class="font-bold">${stats.genders.male}</span></li>
      <li>Sexo feminino: <span class="font-bold">${stats.genders.female}</span></li>
      <li>Soma das idades: <span class="font-bold">${stats.sumOfAllAges}</span></li>
      <li>Média das idades: <span class="font-bold">${stats.averageOfAllAges}</span></li>
    `;
    userStatsList.appendChild(li);
  } else {
    userStatsList.innerHTML = '';
    userStatsList.innerHTML = '<li class="text-2xl py-5">Nada a ser exibido</li>';
  }
}