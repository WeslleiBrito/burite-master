-- Active: 1700054762577@@127.0.0.1@3306

CREATE TABLE IF NOT EXISTS patients (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    rg TEXT NOT NULL UNIQUE,
    cpf TEXT UNIQUE,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL
);

CREATE TABLE IF NOT EXISTS companies (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    cnpj TEXT UNIQUE,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL
);

CREATE TABLE IF NOT EXISTS exams (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL UNIQUE,
    price INT DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL
);

CREATE TABLE IF NOT EXISTS occupational_risks (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL UNIQUE,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL
);

CREATE TABLE IF NOT EXISTS forms (
    id TEXT PRIMARY KEY NOT NULL,
    id_company TEXT NOT NULL,
    id_patient TEXT NOT NULL,
    name_company TEXT NOT NULL,
    name_patient TEXT NOT NULL,
    rg TEXT NOT NULL,
    cnpj TEXT,
    cpf TEXT,
    number_procedures INT NOT NULL,
    amount INT DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
    FOREIGN KEY(id_company) REFERENCES companies(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_patient) REFERENCES patients(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS procedures_forms (
    id TEXT PRIMARY KEY NOT NULL,
    id_form TEXT NOT NULL,
    id_exam TEXT NOT NULL,
    name_exam TEXT NOT NULL,
    price INT DEFAULT(0) NOT NULL,
    FOREIGN KEY(id_form) REFERENCES forms(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_exam) REFERENCES exams(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS occupationalRisk_forms (
    id TEXT PRIMARY KEY NOT NULL,
    id_form TEXT NOT NULL,
    id_risk TEXT NOT NULL,
    name_risk TEXT NOT NULL,
    FOREIGN KEY(id_form) REFERENCES forms(id) ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(id_risk) REFERENCES occupational_risks(id) ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS occupationalRisk_forms;

CREATE TABLE IF NOT EXISTS total_values (
    id TEXT PRIMARY KEY NOT NULL,
    invoicing INT DEFAULT(0),
    cost INT DEFAULT(0),
    fixed_expenses INT DEFAULT(0),
    variable_expenses INT DEFAULT(0),
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL
);

CREATE TABLE IF NOT EXISTS total_values_monthly (
    id TEXT PRIMARY KEY NOT NULL,
    invoicing INT DEFAULT(0),
    cost INT DEFAULT(0),
    fixed_expenses INT DEFAULT(0),
    variable_expenses INT DEFAULT(0),
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    updated_at TEXT DEFAULT(DATETIME()) NOT NULL
);

CREATE TABLE IF NOT EXISTS resume_subgroups (
    cod_subgroup INT NOT NULL,
    name_subroup TEXT NOT NULL,
    amount_quantity INT NOT NULL,
    amount_quantity_retorned INT NOT NULL,
    amount_invoicing INT NOT NULL,
    amount_cost INT NOT NULL,
    amount_discount INT NOT NULL,
    amount_fixed INT NOT NULL,
    fixed_unit_expense INT NOT NULL,
    subgroup_profit INT NOT NULL,
    discount_percentage INT NOT NULL,
    invoicing_percentage INT NOT NULL,
    cost_percentage INT NOT NULL,
    fixed_expense_percentage INT NOT NULL,
    subgroup_profit_percentage INT NOT NULL
);

CREATE TABLE IF NOT EXISTS resume_subgroups_monthly (
    cod_subgroup INT NOT NULL,
    name_subroup TEXT NOT NULL,
    amount_quantity INT NOT NULL,
    amount_invoicing INT NOT NULL,
    amount_cost INT NOT NULL,
    amount_discount INT NOT NULL,
    amount_fixed INT NOT NULL,
    fixed_unit_expense INT NOT NULL,
    subgroup_profit INT NOT NULL,
    discount_percentage INT NOT NULL,
    invoicing_percentage INT NOT NULL,
    cost_percentage INT NOT NULL,
    fixed_expense_percentage INT NOT NULL,
    subgroup_profit_percentage INT NOT NULL
);

CREATE TABLE IF NOT EXISTS "total_values_monthly" (
	"id"	TEXT NOT NULL,
	"invoicing"	INT NOT NULL DEFAULT (0),
	"cost"	INT NOT NULL DEFAULT (0),
	"fixed_expenses"	INT NOT NULL DEFAULT (0),
	"variable_expenses"	INT NOT NULL DEFAULT (0),
	"created_at"	TEXT NOT NULL DEFAULT (DATETIME()),
	"updated_at"	TEXT NOT NULL DEFAULT (DATETIME()),
	"discount"	INTEGER NOT NULL,
	"discount_percentage"	INTEGER NOT NULL,
	"variable_expense_percentage"	INTEGER NOT NULL,
	"general_monetary_profit"	INTEGER NOT NULL,
	"general_percentage_profit"	INTEGER NOT NULL,
	PRIMARY KEY("id")
)