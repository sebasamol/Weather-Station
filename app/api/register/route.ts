import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';

const pool = new Pool({
    connectionString: process.env.DB_CONN_STRING,
});

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();
        
        // Validate input
        if (!data.username|| !data.password) {
            return NextResponse.json({
                message: 'Username and password are required',
            }, {
                status: 400,
            });
        }

        // Check if user already exists
        const existingUser = await pool.query('SELECT * FROM users WHERE username = $1', [data.username]);
        if (existingUser.rows.length > 0) {
            return NextResponse.json({
                message: 'Username already exists',
            }, {
                status: 409,
            });
        }

        // Hash password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);

        // Insert new user with hashed password
        await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2)',
            [data.username, hashedPassword]
        );

        return NextResponse.json({
            message: 'User created successfully',
        }, {
            status: 201,
        });
    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({
            message: 'Internal server error',
        }, {
            status: 500,
        });
    }
}
