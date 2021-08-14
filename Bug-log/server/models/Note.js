import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const Note = new Schema(
  {
    body: { type: String, required: true },
    bugId: { type: ObjectId, required: true },
    creatorId: { type: ObjectId, ref: 'Account', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
)
Note.virtual('creator', {
  localField: 'creatorID',
  ref: 'Account',
  foreignField: 'Account',
  justOne: true
})
