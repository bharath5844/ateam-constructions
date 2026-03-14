import { db, auth } from './firebase';
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp, getDoc, setDoc } from 'firebase/firestore';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export const loginAdmin = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const logoutAdmin = () => signOut(auth);
export const onAuthChange = (cb) => onAuthStateChanged(auth, cb);

const DEFAULT_SERVICES = [
  { id:'1', name:'Vastu House Plans', icon:'🧭', description:'Scientifically designed Vastu-compliant floor plans that ensure harmony, prosperity, and positive energy flow in your home.', active:true },
  { id:'2', name:'3D Elevation Design', icon:'🏠', description:'Stunning photorealistic 3D exterior elevations that let you visualize your dream home before the first brick is laid.', active:true },
  { id:'3', name:'Interior Design', icon:'🛋️', description:'Bespoke interior design solutions crafting beautiful, functional spaces that reflect your personality and lifestyle.', active:true },
  { id:'4', name:'Municipal Permission', icon:'📋', description:'End-to-end assistance with GHMC, HMDA and municipal building plan approvals, making compliance stress-free.', active:true },
  { id:'5', name:'Gram Panchayat Approvals', icon:'✅', description:'Expert handling of Gram Panchayat building approvals for residential and commercial constructions in rural areas.', active:true },
  { id:'6', name:'Real Estate', icon:'🏘️', description:'Premium real estate consultancy — from site selection to investment advice, helping you make the right property decisions.', active:true },
  { id:'7', name:'Development Projects', icon:'🏗️', description:'Large-scale residential and commercial development projects executed with world-class quality and timely delivery.', active:true },
  { id:'8', name:'Structural Design', icon:'📐', description:'Safe, durable, and cost-optimized structural engineering solutions for buildings of all sizes.', active:true }
];

export const getProjects = async () => {
  const q = query(collection(db,'projects'), orderBy('createdAt','desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id:d.id, ...d.data() }));
};

export const deleteProject = async (id) => {
  await deleteDoc(doc(db,'projects',id));
};

export const getServices = async () => {
  const snap = await getDocs(collection(db,'services'));
  if (snap.empty) {
    for (const s of DEFAULT_SERVICES) await setDoc(doc(db,'services',s.id), s);
    return DEFAULT_SERVICES;
  }
  return snap.docs.map(d => ({ id:d.id, ...d.data() }));
};

export const updateService = async (id, data) => updateDoc(doc(db,'services',id), data);
export const addService = async (data) => { const r = await addDoc(collection(db,'services'), data); return { id:r.id, ...data }; };
export const deleteService = async (id) => deleteDoc(doc(db,'services',id));

export const submitEnquiry = async (data) => {
  await addDoc(collection(db,'enquiries'), { ...data, status:'new', createdAt:serverTimestamp() });
};

export const getEnquiries = async () => {
  const q = query(collection(db,'enquiries'), orderBy('createdAt','desc'));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id:d.id, ...d.data(), createdAt:d.data().createdAt?.toDate?.()?.toISOString() || new Date().toISOString() }));
};

export const updateEnquiry = async (id, data) => updateDoc(doc(db,'enquiries',id), data);
export const deleteEnquiry = async (id) => deleteDoc(doc(db,'enquiries',id));

const DEFAULT_ABOUT = {
  description:'A-Team Constructions is a premier architectural and construction firm based in Andhra Pradesh, delivering exceptional residential and commercial projects across the region.',
  stats:[
    { label:'Projects Completed', value:'500+' },
    { label:'Years Experience', value:'10+' },
    { label:'Happy Clients', value:'500+' },
    { label:'Cities Served', value:'20+' }
  ],
  address:'Shop No 5-144/25/2, Bdl X Road, Shankarpalle, Telangana 501203',
  email:'info@ateamconstructions.in',
  workingHours:'Mon – Sat: 9:00 AM – 7:00 PM'
};

export const getAbout = async () => {
  const snap = await getDoc(doc(db,'settings','about'));
  if (!snap.exists()) { await setDoc(doc(db,'settings','about'), DEFAULT_ABOUT); return DEFAULT_ABOUT; }
  return snap.data();
};

export const updateAbout = async (data) => setDoc(doc(db,'settings','about'), data, { merge:true });
