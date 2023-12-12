import { Schema, model } from "mongoose";

export interface Course {
    courseDesImg: string;
    courseDesText: string;
    courseCategory: string;
    courseNewCat: string;
    courseTitle: string;
    courseDuration: string;
    courseAccess: string;
    courseCurriculum: any;
    courseFaq: string[];
    courseAnnouncement: string;
    courseVideoNums: number;
    courseLevel: string;
}

const lessonSchema = new Schema({
    title: String,
    textLesson: String,
    duration: String,
    videoLesson: String,
    material: String
});

const sectionSchema = new Schema({
    sectionTitle: String,
    lessons: [lessonSchema]  // Embed the lesson schema as an array
});

const curriculumSchema = new Schema({
    sections: [sectionSchema]  // Embed the section schema as an array
});

const CourseSchema = new Schema(
    {
        courseDesImg: {type: String},
        courseDesText: {type: String},
        courseCategory: {type: String},
        courseNewCat: {type: String},
        courseTitle: {type: String},
        courseDuration: {type: String},
        courseAccess: {type: String},
        courseCurriculum: [],
        courseFaq: {type: [String]},
        courseAnnouncement: {type: String},
        courseLevel: {type: String},

    }, {

        toJSON: {
            virtuals: true
        },

        toObject: {
            virtuals: true
        },
        
        timestamps: true
        
    }
)

  export const Lesson = model('Lesson', lessonSchema);
  export const Section = model('Section', sectionSchema);
  export const Curriculum = model('Curriculum', curriculumSchema);

  export const CourseModel = model('course', CourseSchema)