const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;

const studentSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    roll_no: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    branch: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    address: {    
        type: String,
        required: true
    },
    phone_no: {    
        type: Number,
        required: true
    }
});

const Student = mongoose.model("Student", studentSchema);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/student/details", async (req, res) => {
    console.log("You requested to add details of a new student");
    try {
        let newStudent = req.body;
        let student = await Student.create(newStudent);
        res.status(201).json({
            message: "successfully added details of a new student",
            data: student,
            success: true
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: {}
        });
    }
});

app.get('/student/details', async (req, res) => {
    console.log("Successfully fetched data of all the students");
    try {
        let students = await Student.find();
        res.status(200).json({
            message: "successfully fetched students",
            data: students,
            success: true,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: {}
        });
    }
});

app.get('/student/details/:student_id', async (req, res) => {
    console.log("Successfully fetched data of a student");
    try {
        let { student_id } = req.params;
        let student_des = await Student.findOne({ _id: student_id });
        res.status(200).json({
            message: "successfully fetched details of a student",
            data: student_des,
            success: true
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: {}
        });
    }
});

app.patch("/updatestudent/:student_id", async (req, res) => {
    console.log("You requested to update the details of student");
    try {
        let { student_id } = req.params;
        let student = await Student.findByIdAndUpdate(student_id, req.body);
        res.status(200).json({
            success: true,
            data: student,
            message: "successfully updated the details of student"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: {}
        });
    }
});

app.delete("/deletestudent/:student_id", async (req, res) => {
    console.log("You requested to delete the details of student");
    try {
        let { student_id } = req.params;
        let student = await Student.findByIdAndDelete(student_id, req.body);
        res.status(200).json({
            success: true,
            data: student,
            message: "successfully deleted the details of student"
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            data: {}
        })
    }
})


const connectToDB = async () => {
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error in connecting to MongoDB", error);
    }
}

const setUpAndStartServer = async () => {
    app.listen(PORT, async () => {
        console.log(`Server running at PORT: ${PORT}`)
        await connectToDB();
    });
}

setUpAndStartServer();