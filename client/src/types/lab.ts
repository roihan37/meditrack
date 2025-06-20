export type ResultLab = { 
    id: string,
    userId: string, 
    date: Date,
    results: {
      glucose: number,
      cholesterol: {
        total: number,
        ldl: number,
        hdl: number
      },
      bloodPressure: {
        systolic: number,
        diastolic: number
      }
      status?: {
        glucose: string;
        cholesterol: {
          total: string;
          ldl: string;
          hdl: string;
        };
        bloodPressure: {
          systolic: string;
          diastolic: string;
        };
      }
    }
};

export type PropsResultLab = {
  results: ResultLab[];
};

export type Cholesterol = { 
      total: number,
      ldl: number,
      hdl: number
  }

  export type PropsCholesterol = { 
    cholesterol : Cholesterol;
}

  
