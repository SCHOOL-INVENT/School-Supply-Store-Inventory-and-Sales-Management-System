# Low-Fidelity Wireframes — Suppliers

**Designer:** Team Member 1–5  
**Week:** 2  
**Purpose:** Low-fidelity boxes and labels for the CRUD stories in `docs/backlog.md`.

---

## 1. List / Index

Stories: Suppliers Read-list

```
+------------------------------------------------------+
| SCHOOL SUPPLY SYSTEM | Suppliers                       |
+------------------------------------------------------+
| Search: [________________]  [Add Suppliers]            |
+------------------------------------------------------+
| ID | Name/Reference | Key Info | Status | Actions    |
|----|----------------|----------|--------|------------|
| 01 | Sample         | Sample   | Active | View Edit  |
| 02 | Sample         | Sample   | Active | View Edit  |
+------------------------------------------------------+
| [Previous] [Page 1] [Next]                            |
+------------------------------------------------------+
```

---

## 2. Detail

Stories: Suppliers Read-detail

```
+-----------------------------------------------+
| Suppliers Detail                    [Back]       |
+-----------------------------------------------+
| ID:        [record id]                        |
| Name:      [record name]                      |
| Details:   [stored information]               |
| Status:    [status]                           |
|                                               |
| [Edit]                         [Delete]        |
+-----------------------------------------------+
```

---

## 3. Create Form

Stories: Suppliers Create

```
+-----------------------------------------------+
| Add Suppliers                                   |
+-----------------------------------------------+
| Name:       [________________________]        |
| Contact:    [________________________]        |
| Category:   [________________________]        |
| Quantity:   [________]  Price: [________]     |
|                                               |
| [Cancel]                    [Save Suppliers]     |
+-----------------------------------------------+
| Validation errors appear beside/under fields. |
+-----------------------------------------------+
```

---

## 4. Edit Form

Stories: Suppliers Update

```
+-----------------------------------------------+
| Edit Suppliers                                  |
+-----------------------------------------------+
| Name:       [existing value___________]       |
| Contact:    [existing value___________]       |
| Category:   [existing value___________]       |
| Quantity:   [existing] Price: [existing]      |
|                                               |
| [Cancel]                    [Save Changes]     |
+-----------------------------------------------+
```

---

## 5. Empty State

Stories: Suppliers Read-list when zero records exist

```
+-----------------------------------------------+
| Suppliers                                       |
+-----------------------------------------------+
|                                               |
|              No Suppliers found                 |
|                                               |
|      [Add Your First Suppliers]                 |
|                                               |
+-----------------------------------------------+
```

---

## 6. Error State

Stories: Suppliers failed action / invalid record

```
+-----------------------------------------------+
| Suppliers — Error                               |
+-----------------------------------------------+
|                                               |
|  ! Something went wrong.                     |
|  [Error message shown here]                  |
|                                               |
|  [Try Again]                 [Back to List]  |
+-----------------------------------------------+
```

---

## 7. Delete Confirmation

Stories: Suppliers Delete

```
+-----------------------------------------------+
| Confirm Delete                                |
+-----------------------------------------------+
| Are you sure you want to delete this Suppliers? |
|                                               |
| This action cannot be undone.                 |
|                                               |
| [Cancel]                    [Confirm Delete]  |
+-----------------------------------------------+
```
