import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const pool = new Pool({
    connectionString: process.env.DB_CONN_STRING,
});

export async function POST(request: NextRequest) {
    const data = await request.json();
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [data.login]);
        const user = rows[0];


        if (!user || !(await bcrypt.compare(data.password, user.password))) {
            return NextResponse.json({
                message: 'Nieprawidłowa nazwa użytkownika lub hasło',
            }, {
                status: 401,
            });
        }

        return NextResponse.json(
            {
                message: 'Success login',
            }, {
            status: 200,
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({
            message: 'Internal server error',

        }, {
            status: 500,
        });
    }

}