
import { Router } from "express"
import { sample_course, sample_data } from "../data";
import asyncHandler from "express-async-handler";
import { CourseModel } from "../models/course.model";

const router = Router();


const newCourse = new CourseModel({courseDesImg: 'https://www.clarkson.edu/sites/default/files/2023-06/Mathematics-Hero-1600x900.jpg',
courseDesText: 'A c++ course description',
courseCategory: 'Maths',
courseNewCat: '',
courseTitle: 'c++',
courseDuration:'2 months',
courseAccess: 'free',
courseCurriculum: [],
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

router.get("/Allcourses", async(req,res) => {
  const courses = await CourseModel.find()
  res.send(courses)
} )

router.post("/add", 
        asyncHandler(
            async(req, res) => {
     const {title, cat , text, Acat, img,
     faq,announce, section} = req.body

         const newCourse = new CourseModel({courseDesImg: img,
         courseDesText: text,
         courseCategory: cat,
         courseNewCat: Acat,
         courseTitle: title,
         courseDuration: '2 months',
         courseAccess: 'free',
         courseCurriculum: section,
         courseAnnouncement: announce,
         courseLevel: 'beginner',
         })

         await CourseModel.create(newCourse)
                  
         }))

export default router


