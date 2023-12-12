import {useCallback, useEffect, useState} from 'react';
import {LinksList} from '../components/LinksList';
import {useAuth} from '../hooks/auth.hook';
import {useHttp} from '../hooks/http.hook';

export const LinksPage = (props) => {
  const [links, setLinks] = useState([]);
  const {loading, request} = useHttp();
  const {token} = useAuth();

  const fetchLinks = useCallback(async () => {
    if (!token) return;
    try {
      const fetched = await request('/api/link', 'GET', null, {Authorization: `Bearer ${token}`});
      setLinks(fetched);
    } catch (e) {}
  },[request, token]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) return <div>loading...</div>;

  return <LinksList links={links} />
}