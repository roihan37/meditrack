export type ResultLab = {
  id?: string ,
  userId?: string ,
  date: Date | string,
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
      ch_total: string;
      ch_ldl: string;
      ch_hdl: string;
      bd_systolic: string;
      bd_diastolic: string;

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
  cholesterol: Cholesterol;
}

export type TableLabResult = {
  id: string | undefined
  date: Date | string
  glucose: number
  ch_hdl: number
  ch_ldl: number
  ch_total: number
  bp_systolic: number
  bp_diastolic: number
}


