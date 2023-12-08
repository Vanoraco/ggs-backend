
import { Router } from "express"
import { sample_course, sample_data } from "../data";
import asyncHandler from "express-async-handler";
import { CourseModel, Curriculum, Lesson, Section } from "../models/course.model";

const router = Router();

const newLesson = new Lesson({ title: 'Introduction to JavaScript',textLesson:'JJJSI',duration: '1 hour' });
const newSection = new Section({ sectionTitle: 'Getting Started', lessons: [newLesson] });
const newCurriculum = new Curriculum({ sections: [newSection] });
const newCourse = new CourseModel({courseDesImg: 'https://www.clarkson.edu/sites/default/files/2023-06/Mathematics-Hero-1600x900.jpg',
courseDesText: 'A c++ course description',
courseCategory: 'Maths',
courseNewCat: '',
courseTitle: 'c++',
courseDuration:'2 months',
courseAccess: 'free',
courseCurriculum: [newCurriculum],
courseAnnouncement: 'good',
courseLevel: 'beginner',
})

router.get('/seed', asyncHandler(
    async(req,res) => {
        const courseCount = await CourseModel.countDocuments();
        if(courseCount > 0) { 
            res.send("Seed already done")
            return;
        }
        await CourseModel.create(newCourse)
        res.send("Seed successful");
}))

router.get("/", (req, res) => {
    res.send(sample_course)
})

export default router


