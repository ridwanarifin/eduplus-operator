
export const initOperator = {
  name: undefined,
  position: undefined,
  email: undefined,
  phone_number: undefined
}

export const initPassword = {
  old_password: undefined,
  password: undefined,
  c_password: undefined
}

export const initSekolah = {
  /**
   * data sekolah
   */
  name: undefined,
  educational_stage: undefined,
  curriculum: undefined,
  npsn: undefined,
  status: undefined,

  address: undefined,
  province_id: undefined,
  regency_id: undefined,
  district_id: undefined,
  village_id: undefined,

  /**
   * kontak sekolah
   */
  phone_number: undefined,
  email: undefined,
  website: undefined,

  /**
   * informasi sekolah
   */
  headmaster: undefined,
  total_student: undefined,
  accreditation: undefined,
  schools_hour: undefined,

  /**
   * biaya sekolah
   */
  etf_cost: undefined,
  spp_cost: undefined,
  activities_cost: undefined,
  book_cost: undefined,
  discount: undefined,

  /**
   * pendaftaran
   */
  registration: undefined,
  annoucement: undefined,
  re_registration: undefined,

  /**
   * fasilitas
   */
  facilities: [],
  extracurricular: []
}

export const initFotoSekolah = {
  image1: undefined,
  image2: undefined,
  image3: undefined,
  image4: undefined,
  image5: undefined
}

export const jenjangItems = [{
  text: 'Sekolah Dasar',
  value: 'SD'
}, {
  text: 'SMP / MTs',
  value: 'SMP'
}, {
  text: 'SMA / MA',
  value: 'SMA'
}]
