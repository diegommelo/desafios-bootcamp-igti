import {promises as fs} from "fs";

const gradeController = {

  loadGrades: async function () {
    const data = JSON.parse(await fs.readFile("./grades.json", "utf-8"));
    return data;
  },
  addNewGrade: async function (req){
    let data = await this.loadGrades();
    let grade = {
      id: data.nextId,
      ...req,
      timestamp: new Date()
    }
    data.nextId++;
    data.grades.push(grade);
    await fs.writeFile("./grades.json", JSON.stringify(data));
    return grade;
  },
  getGrade: async function (id){
    let grades = await this.loadGrades();
    let res = grades.grades.filter((grade) => {
      return grade.id === parseInt(id);
    });
    return res;
  },
  deleteGrade: async function(id){
    let grades = await this.loadGrades();
    grades.grades = grades.grades.filter((grade) => {
      return grade.id !== parseInt(id);
    });
    await fs.writeFile("./grades.json", JSON.stringify(grades));
    return grades;
  },
  updateGrade: async function(req) {
    try {
      let grades = await this.loadGrades();
      const index = grades.grades.findIndex(grade => grade.id === req.id);
      req = {
        ...req,
        timestamp: new Date()
      }
      grades.grades[index] = req;
      await fs.writeFile("./grades.json", JSON.stringify(grades));
      return req;
    } catch (error) {
      return error;
    }
  },
  getTotalGradesByStudent: async function(req){
    try {
      const data = await this.loadGrades();
      const student = data.grades.filter(student => student.student === req.student && student.subject === req.subject);
      const totalGrades = student.reduce((prev,curr) => {return prev + curr.value}, 0);
      return totalGrades;
    } catch (err) {
      return err
    }
  },
  getAverageGradeByType: async function(req){
    try {
      const data = await this.loadGrades();
      const grades = data.grades.filter(grade => grade.subject === req.subject && grade.type === req.type);
      const totalGrades = grades.reduce((prev, curr) =>{ return prev + curr.value }, 0);
      const averageGrade = totalGrades / grades.length;
      return averageGrade;
    } catch (err) {
      return err;
    }
  },
  getBestThreeGradesByType: async function(req) {
    try {
      const data = await this.loadGrades();
      const grades = data.grades.filter(grade => grade.subject === req.subject && grade.type === req.type);
      const sortedGrades = grades.sort((a, b) => a.value > b.value ? -1 : a.value < b.value ? 1 : 0)
      return sortedGrades.slice(0,3);
    } catch (err) {
      return err;
    }
  }
}

export default gradeController;