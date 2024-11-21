import db from "../database/index";

let { modules } = db;

export const findModulesForCourse = (courseId: number) => {
  return modules.filter((module) => module.course === courseId);
};

export const createModule = (module: any) => {
  const newModule = { ...module, _id: modules[modules.length - 1]._id + 1 };
  modules = [...modules, newModule];
  return newModule;
};

export const updateModule = (moduleId: number, updatedModule: any) => {
  const module: any = modules.find((module) => module._id === moduleId);
  Object.assign(module, updatedModule);
  return module;
};

export const deleteModule = (moduleId: number) => {
  modules = modules.filter((module) => module._id !== moduleId);
};
