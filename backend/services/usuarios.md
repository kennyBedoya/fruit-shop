````markdown
# Users API Documentation

## Base URL

```
http://localhost:3000
```

---

# Authentication

Actualmente la API no requiere autenticación.

---

# Endpoints

## 1. Obtener todos los usuarios

**GET** `/users`

Obtiene la lista completa de usuarios registrados.

### Request

```http
GET /users HTTP/1.1
Host: localhost:3000
```

### Response (200 OK)

```json
{
    "success": true,
    "data": [
        {
            "Id": 1,
            "Name": "Juan Perez",
            "Email": "juan@email.com",
            "Age": 30
        },
        {
            "Id": 2,
            "Name": "Maria Gomez",
            "Email": "maria@email.com",
            "Age": 25
        }
    ]
}
```

### Response (500 Internal Server Error)

```json
{
    "success": false,
    "message": "Error interno del servidor"
}
```

---

## 2. Obtener un usuario por ID

**GET** `/users/:id`

Obtiene la información de un usuario específico.

### Parámetros

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | Integer | Identificador del usuario |

### Request

```http
GET /users/1 HTTP/1.1
Host: localhost:3000
```

### Response (200 OK)

```json
{
    "success": true,
    "data": {
        "Id": 1,
        "Name": "Juan Perez",
        "Email": "juan@email.com",
        "Age": 30
    }
}
```

### Response (404 Not Found)

```json
{
    "success": false,
    "message": "Usuario no encontrado"
}
```

### Response (500 Internal Server Error)

```json
{
    "success": false,
    "message": "Error interno del servidor"
}
```

---

## 3. Crear usuario

**POST** `/users`

Crea un nuevo usuario.

### Header
Content-Type: application/json

### Body

```json
{
        "name": "Juan Perez",
        "surname" :  "prueba",
        "type": 1,
        "phone": 3333333,
        "email": "juan@email.com",
        "age": 33,
        "institution": "2"
    }
```

### Campos

| Campo | Tipo | Requerido |
|--------|------|-----------|
| name | String | Sí |
| email | String | Sí |
| age | Integer | Sí |

### Response (201 Created)

```json
{
    "success": true,
    "message": "Usuario creado",
    "data": {
        "Id": 1,
        "Name": "Juan Perez",
        "Email": "juan@email.com",
        "Age": 30
    }
}
```

### Response (500 Internal Server Error)

```json
{
    "success": false,
    "message": "Error interno del servidor"
}
```

---

## 4. Actualizar usuario

**PUT** `/users/:id`

Actualiza la información de un usuario existente.

### Parámetros

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | Integer | Identificador del usuario |

### Body

```json
{
        "name": "Juan Perez",
        "surname" :  "prueba",
        "type": 1,
        "phone": 3333333,
        "email": "juan@email.com",
        "age": 33,
        "institution": "2"
    }
```

### Response (200 OK)

```json
{
    "success": true,
    "message": "Usuario actualizado",
    "data": {
        "Id": 1,
        "Name": "Juan Perez",
        "Email": "juan_actualizado@email.com",
        "Age": 31
    }
}
```

### Response (404 Not Found)

```json
{
    "success": false,
    "message": "Usuario no encontrado"
}
```

### Response (500 Internal Server Error)

```json
{
    "success": false,
    "message": "Error interno del servidor"
}
```

---

## 5. Eliminar usuario

**DELETE** `/users/:id`

Elimina un usuario de la base de datos.

### Parámetros

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| id | Integer | Identificador del usuario |

### Request

```http
DELETE /users/1 HTTP/1.1
Host: localhost:3000
```

### Response (200 OK)

```json
{
    "success": true,
    "message": "Usuario eliminado",
    "data": {
        "Id": 1,
        "Name": "Juan Perez",
        "Email": "juan@email.com",
        "Age": 30
    }
}
```

### Response (404 Not Found)

```json
{
    "success": false,
    "message": "Usuario no encontrado"
}
```

### Response (500 Internal Server Error)

```json
{
    "success": false,
    "message": "Error interno del servidor"
}
```

---

# Modelo de datos

## User

| Campo | Tipo | Descripción |
|--------|------|-------------|
| Id | Integer | Identificador único |
| Name | String | Nombre del usuario |
| Email | String | Correo electrónico |
| Age | Integer | Edad |

---

# Códigos de estado HTTP

| Código | Descripción |
|---------|-------------|
| 200 | Solicitud procesada correctamente |
| 201 | Recurso creado correctamente |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

---

# Ejemplos con cURL

## Obtener usuarios

```bash
curl http://localhost:3000/users
```

## Obtener usuario por ID

```bash
curl http://localhost:3000/users/1
```

## Crear usuario

```bash
curl -X POST http://localhost:3000/users \
-H "Content-Type: application/json" \
-d '{
    "name":"Juan Perez",
    "email":"juan@email.com",
    "age":30
}'
```

## Actualizar usuario

```bash
curl -X PUT http://localhost:3000/users/1 \
-H "Content-Type: application/json" \
-d '{
    "name":"Juan Perez",
    "email":"nuevo@email.com",
    "age":31
}'
```

## Eliminar usuario

```bash
curl -X DELETE http://localhost:3000/users/1
```
````
