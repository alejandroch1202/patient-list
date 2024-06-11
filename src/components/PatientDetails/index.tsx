import { toast } from 'react-toastify'
import { usePatientStore } from '../../store'
import type { Patient } from '../../types'
import { PatientDetailsItem } from '../PatientDetailsItem'

interface PatientDetailsProps {
  patient: Patient
}

export const PatientDetails = ({ patient }: PatientDetailsProps) => {
  const removePatient = usePatientStore((state) => state.removePatient)
  const setActiveId = usePatientStore((state) => state.setActiveId)

  const handleClick = (id: string) => {
    removePatient(id)
    toast.success('Paciente eliminado correctamente')
  }

  return (
    <div className='mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-lg'>
      <PatientDetailsItem
        label='id'
        data={patient.id}
      />
      <PatientDetailsItem
        label='nombre'
        data={patient.name}
      />
      <PatientDetailsItem
        label='propietario'
        data={patient.caretaker}
      />
      <PatientDetailsItem
        label='email'
        data={patient.email}
      />
      <PatientDetailsItem
        label='fecha'
        data={patient.date.toString()}
      />
      <PatientDetailsItem
        label='sintomas'
        data={patient.symptoms}
      />

      <div className='flex flex-col lg:flex-row gap-2 justify-between mt-10'>
        <button
          onClick={() => {
            setActiveId(patient.id)
          }}
          type='button'
          className='py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg'
        >
          Editar
        </button>
        <button
          onClick={() => {
            handleClick(patient.id)
          }}
          type='button'
          className='py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg'
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}
