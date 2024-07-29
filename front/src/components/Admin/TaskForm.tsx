import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../../services/api';
import { User } from '../../types';
import { RootState } from '../../store/store';
import './TaskForm.css';

interface TaskFormProps {
  onTaskCreated: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [userId, setUserId] = useState<number | ''>('');
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get<User[]>('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Échec de la récupération des utilisateurs:', error);
        setError('Échec de la récupération des utilisateurs');
      }
    };

    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!isAdmin) {
      setError('Seuls les administrateurs peuvent créer des tâches');
      setIsLoading(false);
      return;
    }

    if (!title || !description || !status || userId === '') {
      setError('Tous les champs sont obligatoires');
      setIsLoading(false);
      return;
    }

    try {
      await api.post('/tasks', { title, description, status, user_id: userId });
      onTaskCreated();
      setTitle('');
      setDescription('');
      setStatus('');
      setUserId('');
    } catch (error: any) {
      console.error('Échec de la création de la tâche:', error);
      setError(error.response?.data?.error || 'Échec de la création de la tâche');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="task-form">
        <p className="error">Seuls les administrateurs ont la permission d'accéder à cette fonctionnalité.</p>
      </div>
    );
  }

  // Filtrer les utilisateurs non administrateurs
  const nonAdminUsers = users.filter(user => user.role !== 'admin');

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        required
      >
        <option value="">Sélectionner le statut</option>
        <option value="urgent">Urgent</option>
        <option value="a faire prochainement">a faire prochainement</option>
        <option value="au fil du temps">au fil du temps</option>
      </select>
      <select
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
        required
      >
        <option value="">Sélectionner l'utilisateur</option>
        {nonAdminUsers.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Création en cours...' : 'Créer une tâche'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default TaskForm;
