import { IResolvers } from 'graphql-tools';
import _ from 'lodash';
import { database } from '../data/data.store';

const mutation: IResolvers = {
  Mutation: {
    cursoNuevo(__: void, { curso }): any {
      const itemCurso = {
        id: String(database.cursos.length + 1),
        title: curso.title,
        description: curso.description,
        clases: curso.clases,
        time: curso.time,
        logo: curso.logo,
        level: curso.leve,
        path: curso.path,
        teacher: curso.teacher,
        reviews: []
      };
      if (database.cursos.filter((curso) => curso.title === itemCurso.title).length === 0) {
        database.cursos.push(itemCurso);
        return itemCurso;
      }
      return {
        id: '-1',
        title: `El curso con titulo: ${curso.title} ya existe`,
        description: '',
        clases: -1,
        time: 0.0,
        logo: '',
        level: 'TODOS',
        path: '',
        teacher: '',
        reviews: []
      }
    },
    modificarCurso(__: void, { curso }): any {
      const elementExiste = _.findIndex(database.cursos, (item) => item.id === curso.id);
      if (elementExiste > -1) {
        const valoraciones = database.cursos[elementExiste].reviews;
        curso.reviews = valoraciones;
        database.cursos[elementExiste] = curso;
        return curso;
      }
      return {
        id: '-1',
        title: `El curso no existe en la base de datos`,
        description: '',
        clases: -1,
        time: 0.0,
        logo: '',
        level: 'TODOS',
        path: '',
        teacher: '',
        reviews: []
      };
    },
    eliminarCurso(__: void, { id }): any {
      const borrarCurso = _.remove(database.cursos, (curso) => curso.id === id);
      if (!borrarCurso[0]) {
        return {
          id: '-1',
          title: `El curso no existe en la base de datos para ser borrado`,
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
      return borrarCurso[0];
    }
  }
}

export default mutation;
