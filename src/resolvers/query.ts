import { IResolvers } from 'graphql-tools';
import { database } from '../data/data.store';

const query: IResolvers = {
  Query: {
    estudiantes(): any {
      return database.estudiantes;
    },
    estudiante(__: void, { id }): any {
      const resultado = database.estudiantes.filter((estudiante) => estudiante.id === id)[0];
      if (!resultado) {
        return {
          id: '-1',
          name: `Estudiante con ID: ${id} no encontrado`,
          email: '',
          courses: []
        };
      }
      return resultado;
    },
    cursos(): any {
      return database.cursos;
    },
    curso(__: void, { id }): any {
      const resultado = database.cursos.filter((curso) => curso.id === id)[0];
      if (!resultado) {
        return {
          id: -1,
          title: `El curso con ID: ${id} no fue encontrado`,
          description: '',
          clases: -1,
          time: 0.0,
          logo: '',
          level: 'TODOS',
          path: '',
          teacher: '',
          reviews: []
        };
      }
      return resultado;
    },
  }
}

export default query;
