import {useCallback, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {LinkCard} from '../components/LinkCard';
import {useAuth} from '../hooks/auth.hook';
import {useHttp} from '../hooks/http.hook';

export const DetailPage = (props) => {
  const [link, setLink] = useState(null);
  const linkId = useParams().id;
  const {request, loading} = useHttp();
  const {token} = useAuth();

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, {Authorization:`Bearer ${token}`});
      setLink(fetched);
    } catch (e) {}
  }, [request, token, linkId]);

  useEffect(() => {
    if (token) {
      getLink();
    }
  }, [getLink, token]);

  if (loading) {
    return <div>loading...</div>
  }

  return (
      !loading && link && <LinkCard link={link}/>
  );
}