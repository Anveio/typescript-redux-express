declare class Course {
  public readonly name: string;
}

declare interface RootState {
  enthusiasm: EnthusiasmState;
  courses: CoursesState;
  form: FormState;
}

declare interface EnthusiasmState { 
  languageName: string; 
  level: number;
}

declare interface CoursesState {
  list: Course[];
}

declare interface FormState {
  text: string;
}