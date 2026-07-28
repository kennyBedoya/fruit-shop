# Cuentas API Documentation

## Base URL

```
http://localhost:3000
```

---

# Endpoints

## 1. Obtener todas las cuentas

**GET** `/cuentas`

Obtiene todas las cuentas asociadas a usuarios activos.

### Response (200 OK)

```json
{
    "success": true,
    "data": [
        {
            "id_cuentas": 1,
            "usuario_id": 1,
            "saldo_anterior": 1000,
            "saldo_actual": 1500,
            "ultima_trasaccion_id": 10
        }
    ]
}
```

---

## 2. Obtener la cuenta de un usuario

**GET** `/cuentas/:usuarioId`

Obtiene la cuenta asociada a un usuario activo.

### Parámetros

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| usuarioId | Integer | ID del usuario |

### Response (200 OK)

```json
{
    "success": true,
    "data": {
        "id_cuentas": 1,
        "usuario_id": 1,
        "saldo_anterior": 1000,
        "saldo_actual": 1500,
        "ultima_trasaccion_id": 10
    }
}
```

### Response (404 Not Found)

```json
{
    "success": false,
    "message": "Cuenta no encontrada"
}
```

---

## 3. Crear cuenta

**POST** `/cuentas`

Crea una cuenta para un usuario activo.

### Body

```json
{
    "usuario_id": 1,
    "saldo_anterior": 0,
    "saldo_actual": 1000,
    "ultima_trasaccion_id": null
}
```

### Campos

| Campo | Tipo | Requerido |
|--------|------|-----------|
| usuario_id | Integer | Sí |
| saldo_anterior | Decimal | Sí |
| saldo_actual | Decimal | Sí |
| ultima_trasaccion_id | Integer / Null | No |
| acudiente_id| Integer / Null | No |

### Response (201 Created)

```json
{
    "success": true,
    "message": "Cuenta creada",
    "data": {
        "id_cuentas": 1,
        "usuario_id": 1,
        "saldo_anterior": 0,
        "saldo_actual": 1000,
        "ultima_trasaccion_id": null,
        "acudiente_id": null
    }
}
```

### Response (404 Not Found)

```json
{
    "success": false,
    "message": "Usuario no existe o está inactivo"
}
```

---

## 4. Actualizar cuenta

**PUT** `/cuentas/:usuarioId`

Actualiza la información de la cuenta de un usuario.

### Parámetros

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| usuarioId | Integer | ID del usuario |

### Body

```json
{
    "saldo_anterior": 1000,
    "saldo_actual": 1500,
    "ultima_trasaccion_id": 15,
    "acudiente_id": null
}
```

### Response (200 OK)

```json
{
    "success": true,
    "message": "Cuenta actualizada",
    "data": {
        "id_cuentas": 1,
        "usuario_id": 1,
        "saldo_anterior": 1000,
        "saldo_actual": 1500,
        "ultima_trasaccion_id": 15
    }
}
```

### Response (404 Not Found)

```json
{
    "success": false,
    "message": "Cuenta no encontrada"
}
```

---

# Modelo de datos

## Cuenta

| Campo | Tipo | Descripción |
|--------|------|-------------|
| id_cuentas | Integer | Identificador de la cuenta |
| usuario_id | Integer | Usuario propietario de la cuenta |
| saldo_anterior | Decimal | Saldo previo a la última transacción |
| saldo_actual | Decimal | Saldo actual de la cuenta |
| ultima_trasaccion_id | Integer | Identificador de la última transacción realizada |

---

# Códigos HTTP

| Código | Descripción |
|---------|-------------|
| 200 | Operación exitosa |
| 201 | Cuenta creada correctamente |
| 404 | Usuario o cuenta no encontrada |
| 500 | Error interno del servidor |

---

# Ejemplos cURL

## Obtener todas las cuentas

```bash
curl http://localhost:3000/cuentas
```

## Obtener cuenta de un usuario

```bash
curl http://localhost:3000/cuentas/1
```

## Crear cuenta

```bash
curl -X POST http://localhost:3000/cuentas \
-H "Content-Type: application/json" \
-d '{
    "usuario_id":1,
    "saldo_anterior":0,
    "saldo_actual":1000,
    "ultima_trasaccion_id":null
}'
```

## Actualizar cuenta

```bash
curl -X PUT http://localhost:3000/cuentas/1 \
-H "Content-Type: application/json" \
-d '{
    "saldo_anterior":1000,
    "saldo_actual":1500,
    "ultima_trasaccion_id":15
}'
```