
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

router.get("/Allcourses", async(req,res) => {
  const courses = await CourseModel.find()
  res.send(courses)
} )

router.post("/add", 
        asyncHandler(
            async(req, res) => {
     const {title, cat , text, Acat, img,
     faq,announce, section} = req.body

         const newLessons = [];
         
         const newSections = [];
         
         // Loop through each section
         for(let i = 0; i < section.length; i++) {
         

          // Get the current section
          const sections = section[i];
           
               
          


         
           // Loop through lessons in this section
           for(let j = 0; j < sections.lessons.length; j++) {
         
             // Get the current lesson
             const lesson = sections.lessons[j];
             
             // Create lesson object
             const newLesson = new Lesson({
               title: lesson.title,
               videoLesson: lesson.videoLesson,
               textLesson: lesson.textLesson,
               duration: lesson.duration
             });
         
             // Add to lessons array
             newLessons.push(newLesson);
         
           }

           // Create lesson object
          const newSection = new Section({
            sectionTitle: sections.title,
            Lesson: newLessons
          });
      
          // Add to lessons array
          newSections.push(newSection);
         
         }
         
             
         const newLesson = new Lesson(newLessons)
         const newSection = new Section({ newLesson });
         const newCurriculum = new Curriculum({sections: newSection});
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


