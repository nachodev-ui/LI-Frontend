import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

export const formatDate = (date) => {
  const parsedDate = parseISO(date)
  return format(parsedDate, 'dd/MM/yyyy HH:mm', { locale: es })
}
