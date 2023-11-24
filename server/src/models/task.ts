import { Schema, model } from "mongoose";
import { Task } from "../interfaces/task.interface";

const TaskSchema = new Schema<Task>(
  {
    userEmail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    priority: {
      required: true,
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const TaskModel = model("tasks", TaskSchema);
export default TaskModel;