import mongoose, { Schema } from 'mongoose'
import { Contact } from './Contact'

export const Company = new Schema({
   name: String,
   city: String,
   state: String,
   url: String,
   contacts: [Contact]
})