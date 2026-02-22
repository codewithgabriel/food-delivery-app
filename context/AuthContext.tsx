import { auth } from '@/lib/firebase';
import {
    createUserWithEmailAndPassword,
    EmailAuthProvider,
    signOut as firebaseSignOut,
    updatePassword as firebaseUpdatePassword,
    onAuthStateChanged,
    reauthenticateWithCredential,
    signInWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, name: string) => Promise<void>;
    signOut: () => Promise<void>;
    changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    id: firebaseUser.uid,
                    email: firebaseUser.email || '',
                    name: firebaseUser.displayName || 'User',
                });
            } else {
                setUser(null);
            }
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    const signIn = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (e: any) {
            throw new Error(e.message || 'Login failed');
        }
    };

    const signUp = async (email: string, password: string, name: string) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            setUser({
                id: userCredential.user.uid,
                email: userCredential.user.email || '',
                name: name,
            });
        } catch (e: any) {
            throw new Error(e.message || 'Signup failed');
        }
    };

    const signOut = async () => {
        try {
            await firebaseSignOut(auth);
        } catch (e: any) {
            // Silently fail or log to a production monitoring service
        }
    };

    const changePassword = async (oldPassword: string, newPassword: string) => {
        const firebaseUser = auth.currentUser;
        if (!firebaseUser || !firebaseUser.email) throw new Error('Not authenticated');

        try {
            // Re-authenticate user before updating password
            const credential = EmailAuthProvider.credential(firebaseUser.email, oldPassword);
            await reauthenticateWithCredential(firebaseUser, credential);
            await firebaseUpdatePassword(firebaseUser, newPassword);
        } catch (e: any) {
            throw new Error(e.message || 'Failed to change password');
        }
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut, changePassword }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
