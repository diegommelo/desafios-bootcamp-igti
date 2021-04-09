import express from "express";
import gradeController from "../controllers/gradesController.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const grade = await gradeController.addNewGrade(req.body);
    res.send(grade);
  } catch (err) {
    res.status(400).send({error: err.message})
  }
});

router.put("/", async (req, res) => {
  try {
    const data = await gradeController.updateGrade(req.body);
    res.send(data);
  } catch (err) {
    res.status(400).send({error: err.message})
  }
});

router.post("/totalGrades", async (req, res) => {
  try {
    const result = await gradeController.getTotalGradesByStudent(req.body);
    res.send(result.toString())
  } catch (err) {
    res.status(400).send({error:err.message})
  }
});

router.post("/averageGradeByType", async (req, res) => {
  try {
    const result = await gradeController.getAverageGradeByType(req.body);
    res.send(result.toString());
  } catch (err) {
    res.status(400).send({error:err.message});
  }
});

router.post("/bestThreeGradesByType", async (req, res) => {
  try {
    const result = await gradeController.getBestThreeGradesByType(req.body);
    res.send(result);
  } catch (err) {
    res.status(400).send({error:err.message})
  }
})

router.get("/:id?", async(req, res) => {
  try {
    const data = await gradeController.getGrade(req.params.id);
    res.send(data);
  } catch (err) {
    res.status(400).send({error: err.message})
  }
});

router.delete("/:id", async(req, res) => {
  try {
    const data = await gradeController.deleteGrade(req.params.id);
    res.send(data);
  } catch (err) {
    res.status(400).send({error: err.message});
  }
})

export default router;