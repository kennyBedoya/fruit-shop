# Transacciones API Documentation

## Base URL

```
http://localhost:3000
```

---

# Endpoints

## 1. Crear transacción

**POST** `/transacciones`

Registra una nueva transacción para un usuario activo.

### Body

```json
{
    "usuario_id": 1,
    "tipo_transaccion_id": "DEPOSITO",
    "monto": 50000,
    "saldo_anterior": 100000,
    "saldo_actual": 150000,
    "medio_pago_id": 2
}
```

### Campos

| Campo | Tipo | Requerido | Descripción |
|--------|------|-----------|-------------|
| usuario_id | Integer | Sí | Identificador del usuario |
| tipo_transaccion | String | Sí | Tipo de transacción (ej. DEPOSITO, RETIRO) |
| monto | Decimal | Sí | Valor de la transacción |
| saldo_anterior | Decimal | Sí | Saldo antes de la transacción |
| saldo_actual | Decimal | Sí | Saldo después de la transacción |
| medio_pago_id | Integer | Sí | Identificador del medio de pago |

### Response (201 Created)

```json
{
    "success": true,
    "message": "Transacción creada correctamente",
    "data": {
        "id_transacciones": 1,
        "usuario_id": 1,
        "tipo_transaccion": "DEPOSITO",
        "monto": 50000,
        "saldo_anterior": 100000,
        "saldo_actual": 150000,
        "medio_pago_id": 2
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

### Response (500 Internal Server Error)

```json
{
    "success": false,
    "message": "Error interno del servidor"
}
```

---

# Modelo de datos

## Transacción

| Campo | Tipo | Descripción |
|--------|------|-------------|
| id_transacciones | Integer | Identificador de la transacción |
| usuario_id | Integer | Usuario asociado a la transacción |
| tipo_transaccion | String | Tipo de transacción |
| monto | Decimal | Valor de la transacción |
| saldo_anterior | Decimal | Saldo previo a la transacción |
| saldo_actual | Decimal | Saldo posterior a la transacción |
| medio_pago_id | Integer | Medio de pago utilizado |

---

# Códigos HTTP

| Código | Descripción |
|---------|-------------|
| 201 | Transacción creada correctamente |
| 404 | Usuario no encontrado o inactivo |
| 500 | Error interno del servidor |

---

# Ejemplo cURL

```bash
curl -X POST http://localhost:3000/transacciones \
-H "Content-Type: application/json" \
-d '{
    "usuario_id":1,
    "tipo_transaccion":"DEPOSITO",
    "monto":50000,
    "saldo_anterior":100000,
    "saldo_actual":150000,
    "medio_pago_id":2
}'
```