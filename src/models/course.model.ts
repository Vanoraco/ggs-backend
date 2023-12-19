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

  export const CourseModel = model('course', CourseSchema)