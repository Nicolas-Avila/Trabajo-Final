import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://ftvsidxfvutfnjqtoisl.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0dnNpZHhmdnV0Zm5qcXRvaXNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY1NzE5NjMsImV4cCI6MjA3MjE0Nzk2M30.1OWhthWk9gqvfgrKQ97xGb_kxjDYwEHZkzT8AVoZYkA'
    );
  }

  // Registrar usuario y guardar nombre en tabla users
  async signUp(email: string, password: string, name: string) {
    // 1️⃣ Crear usuario en Auth
    const { data: authData, error: authError } = await this.supabase.auth.signUp({
      email,
      password
    });

    if (authError) {
      return { data: null, error: authError };
    }

    // 2️⃣ Guardar datos extra en tabla "users"
    const { data, error } = await this.supabase
      .from('users')
      .insert([{
        id: authData.user?.id,  // El id generado por Auth
        name: name,
        email: email
      }]);

    if (error) {
      return { data: null, error };  // Error al insertar en tabla
    }

    return { data, error: null };  // Todo OK
  }

  // Login usuario
  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  }

  // Logout
  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    return { error };
  }

  // Usuario actual
  async getUser() {
    const { data, error } = await this.supabase.auth.getUser();
    return { data, error };
  }
}
