import { create } from 'zustand'
import { v4 as uuid } from 'uuid'
import type { DraftPatient, Patient } from './types'
import { devtools, persist } from 'zustand/middleware'

interface PatientState {
  patients: Patient[]
  activeId: string
  setActiveId: (id: Patient['id']) => void
  addPatient: (data: DraftPatient) => void
  removePatient: (id: Patient['id']) => void
  editPatient: (data: DraftPatient) => void
}

const createPatient = (data: DraftPatient): Patient => {
  return {
    ...data,
    id: uuid()
  }
}

export const usePatientStore = create<PatientState>()(
  devtools(
    persist(
      (set) => ({
        patients: [],
        activeId: '',

        setActiveId: (id) => {
          set(() => ({
            activeId: id
          }))
        },

        addPatient: (data) => {
          const newPatient = createPatient(data)
          set((state) => ({
            patients: [...state.patients, newPatient]
          }))
        },

        removePatient: (id) => {
          set((state) => ({
            patients: state.patients.filter((patient) => patient.id !== id)
          }))
        },

        editPatient: (data) => {
          set((state) => ({
            patients: state.patients.map((patient) =>
              patient.id === state.activeId
                ? { ...data, id: state.activeId }
                : patient
            ),
            activeId: ''
          }))
        }
      }),
      { name: 'patient-storage' }
    )
  )
)
