import { useState, useEffect } from "react";
import { db } from '@/firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const useFetchUser = (email:string) => {
    const [loading, setLoading] = useState(true);
    const [specificUser, setSpecificUser] = useState<any[]>([]);

    const getData = async () => {
        try {
            const q = query(collection(db, 'Users'), where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const userDoc = querySnapshot.docs[0];
                const user = userDoc.data();
                setLoading(false)
                setSpecificUser([user]);             
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error getting user from Firestore:', error);
            return null;
        }
    };

    useEffect(() => {
        getData();
    }, [getData]);
    return { loading, specificUser };
}

export default useFetchUser;