import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { ErrorMessage } from '../ErrorMessage'
import type { DraftPatient } from '../../types'
import { usePatientStore } from '../../store'

export const PatientsForm = () => {
  const patients = usePatientStore((state) => state.patients)
  const activeId = usePatientStore((state) => state.activeId)
  const addPatient = usePatientStore((state) => state.addPatient)
  const editPatient = usePatientStore((state) => state.editPatient)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<DraftPatient>()

  useEffect(() => {
    if (activeId !== '') {
      const activePatient = patients.find((patient) => patient.id === activeId)
      if (activePatient === undefined) return

      setValue('name', activePatient.name)
      setValue('caretaker', activePatient.caretaker)
      setValue('email', activePatient.email)
      setValue('symptoms', activePatient.symptoms)
      setValue('date', activePatient.date)
    }
  }, [activeId])

  const registerPatient = (data: DraftPatient) => {
    if (activeId !== '') {
      editPatient(data)
      toast.success('Paciente actualizado correctamente')
    } else {
      addPatient(data)
      toast.success('Paciente registrado correctamente')
    }
    reset()
  }

  return (
    <div className='md:w-1/2 lg:w-2/5 mx-5'>
      <h2 className='font-black text-3xl text-center'>Seguimiento Pacientes</h2>

      <p className='text-lg mt-5 text-center mb-10'>
        Añade pacientes y {''}
        <span className='text-indigo-600 font-bold'>administralos</span>
      </p>

      <form
        onSubmit={handleSubmit(registerPatient)}
        className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'
        noValidate
      >
        <div className='mb-5'>
          <label
            htmlFor='name'
            className='text-sm uppercase font-bold'
          >
            Paciente
          </label>
          <input
            id='name'
            className='w-full p-3  border border-gray-100'
            type='text'
            placeholder='Nombre del paciente'
            {...register('name', {
              required: 'El nombre del paciente es obligatorio'
            })}
          />
          {errors.name !== undefined && (
            <ErrorMessage>{errors.name.message!}</ErrorMessage>
          )}
        </div>

        <div className='mb-5'>
          <label
            htmlFor='caretaker'
            className='text-sm uppercase font-bold'
          >
            Propietario
          </label>
          <input
            id='caretaker'
            className='w-full p-3  border border-gray-100'
            type='text'
            placeholder='Nombre del propietario'
            {...register('caretaker', {
              required: 'El nombre del propietario es obligatorio'
            })}
          />
          {errors.caretaker !== undefined && (
            <ErrorMessage>{errors.caretaker.message!}</ErrorMessage>
          )}
        </div>

        <div className='mb-5'>
          <label
            htmlFor='email'
            className='text-sm uppercase font-bold'
          >
            Email
          </label>
          <input
            id='email'
            className='w-full p-3  border border-gray-100'
            type='email'
            placeholder='Email de registro'
            {...register('email', {
              required: 'El email es obligatorio',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email no válido'
              }
            })}
          />
          {errors.email !== undefined && (
            <ErrorMessage>{errors.email.message!}</ErrorMessage>
          )}
        </div>

        <div className='mb-5'>
          <label
            htmlFor='date'
            className='text-sm uppercase font-bold'
          >
            Fecha Alta
          </label>
          <input
            id='date'
            className='w-full p-3 border border-gray-100'
            type='date'
            {...register('date', {
              required: 'La fecha de alta es obligatoria'
            })}
          />
          {errors.date !== undefined && (
            <ErrorMessage>{errors.date.message!}</ErrorMessage>
          )}
        </div>

        <div className='mb-5'>
          <label
            htmlFor='symptoms'
            className='text-sm uppercase font-bold'
          >
            Síntomas
          </label>
          <textarea
            id='symptoms'
            className='w-full p-3  border border-gray-100'
            placeholder='Síntomas del paciente'
            {...register('symptoms', {
              required: 'Los sintomas del paciente son obligatorios'
            })}
          ></textarea>

          {errors.symptoms !== undefined && (
            <ErrorMessage>{errors.symptoms.message!}</ErrorMessage>
          )}
        </div>

        <input
          type='submit'
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors'
          value='Guardar Paciente'
        />
      </form>
    </div>
  )
}
