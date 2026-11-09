import prisma from "../lib/prisma.js";

function leerId(req) {
  const id = Number(req.params.id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function listarLibros(req, res) {
  try {
    const { reservado, editorial, autor } = req.query;
    const filtro = {};

    if (reservado !== undefined) {
      filtro.reservado = reservado === "true";
    }

    if (editorial !== undefined) {
      filtro.editorial = { contains: editorial.trim() };
    }

    if (autor !== undefined) {
      filtro.autor = { contains: autor.trim() };
    }

    const libros = await prisma.libro.findMany({
      where: filtro,
      orderBy: { id: "asc" }
    });

    res.json(libros);
  } catch (error) {
    console.error("Error al listar libros:", error);
    res.status(500).json({ error: "No se pudieron obtener los libros" });
  }
}

export async function obtenerLibro(req, res) {
  try {
    const id = leerId(req);
    if (id === null) {
      return res.status(400).json({ error: "El id debe ser un numero entero" });
    }

    const libro = await prisma.libro.findUnique({ where: { id } });

    if (!libro) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    res.json(libro);
  } catch (error) {
    console.error("Error al obtener libro:", error);
    res.status(500).json({ error: "No se pudo obtener el libro" });
  }
}

export async function crearLibro(req, res) {
  try {
    // Los datos ya vienen validados por el middleware validarLibro
    const { titulo, descripcion, autor, editorial, anioPublicacion } = req.body;

    const libro = await prisma.libro.create({
      data: {
        titulo: titulo.trim(),
        descripcion:
          typeof descripcion === "string" && descripcion.trim()
            ? descripcion.trim()
            : null,
        autor: autor.trim(),
        editorial: editorial.trim(),
        anioPublicacion:
          anioPublicacion !== undefined && anioPublicacion !== null && anioPublicacion !== ""
            ? Number(anioPublicacion)
            : null
      }
    });

    res.status(201).json(libro);
  } catch (error) {
    console.error("Error al crear libro:", error);
    res.status(500).json({ error: "No se pudo crear el libro" });
  }
}

export async function actualizarLibro(req, res) {
  try {
    const id = leerId(req);
    if (id === null) {
      return res.status(400).json({ error: "El id debe ser un numero entero" });
    }

    const existente = await prisma.libro.findUnique({ where: { id } });

    if (!existente) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    const { titulo, descripcion, reservado, autor, editorial, anioPublicacion } =
      req.body ?? {};
    const datos = {};

    if (titulo !== undefined) {
      if (typeof titulo !== "string" || titulo.trim().length < 3) {
        return res.status(400).json({
          error: "El titulo debe tener al menos 3 caracteres"
        });
      }
      datos.titulo = titulo.trim();
    }

    if (descripcion !== undefined) {
      datos.descripcion =
        typeof descripcion === "string" && descripcion.trim()
          ? descripcion.trim()
          : null;
    }

    if (reservado !== undefined) {
      if (typeof reservado !== "boolean") {
        return res.status(400).json({
          error: "reservado debe ser true o false"
        });
      }
      datos.reservado = reservado;
    }

    // autor y editorial son obligatorios en la BD: no se pueden dejar vacíos
    if (autor !== undefined) {
      if (typeof autor !== "string" || !autor.trim()) {
        return res.status(400).json({ error: "El autor no puede estar vacío" });
      }
      datos.autor = autor.trim();
    }

    if (editorial !== undefined) {
      if (typeof editorial !== "string" || !editorial.trim()) {
        return res.status(400).json({ error: "La editorial no puede estar vacía" });
      }
      datos.editorial = editorial.trim();
    }

    if (anioPublicacion !== undefined) {
      if (
        anioPublicacion !== null &&
        anioPublicacion !== "" &&
        (!Number.isInteger(Number(anioPublicacion)) || Number(anioPublicacion) < 0)
      ) {
        return res.status(400).json({
          error: "El año de publicación debe ser un número entero válido"
        });
      }
      datos.anioPublicacion =
        anioPublicacion === null || anioPublicacion === ""
          ? null
          : Number(anioPublicacion);
    }

    if (Object.keys(datos).length === 0) {
      return res.status(400).json({
        error: "No se ha enviado ningún campo válido para actualizar"
      });
    }

    const libro = await prisma.libro.update({
      where: { id },
      data: datos
    });

    res.json(libro);
  } catch (error) {
    console.error("Error al actualizar libro:", error);
    res.status(500).json({ error: "No se pudo actualizar el libro" });
  }
}

export async function eliminarLibro(req, res) {
  try {
    const id = leerId(req);
    if (id === null) {
      return res.status(400).json({ error: "El id debe ser un numero entero" });
    }

    const existente = await prisma.libro.findUnique({ where: { id } });

    if (!existente) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    await prisma.libro.delete({ where: { id } });

    res.status(204).send();
  } catch (error) {
    console.error("Error al eliminar libro:", error);
    res.status(500).json({ error: "No se pudo eliminar el libro" });
  }
}
