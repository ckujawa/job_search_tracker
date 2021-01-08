import mongoose, { Schema } from 'mongoose'

export const Contact = new Schema({
    firstName: String,
    lastName: String,
    title: String,
    email: String
})