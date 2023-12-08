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
        courseDesImg: {type: String, required: true},
        courseDesText: {type: String, required: true},
        courseCategory: {type: String, required: true},
        courseNewCat: {type: String},
        courseTitle: {type: String, required: true},
        courseDuration: {type: String, required: true},
        courseAccess: {type: String, required: true},
        courseCurriculum: [curriculumSchema],
        courseFaq: {type: [String]},
        courseAnnouncement: {type: String, required: true},
        courseLevel: {type: String, required: true},

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