import { GetServerSideProps, InferGetServerSidePropsType, PreviewData } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import {
  QueryParams,
  getCharacter,
  getCharacters,
  getRunningQueriesThunk,
} from '../src/store/marvelApi';
import { wrapper } from '../src/store';
import Layout from '../components/layout';
import Main from '../components/main';

export default function App({
  mainData,
  detailData,
}: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  return (
    <Layout>
      <Main mainData={mainData} detailData={detailData} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<
  { mainData?: object; detailData?: object },
  ParsedUrlQuery,
  PreviewData
> = wrapper.getServerSideProps((store) => async ({ query }): Promise<{ props: object }> => {
  const limit: number = Number(query.limit || 3);
  const page: number = Number(query.page || 1);

  const queryParams: QueryParams = {
    limit: String(limit),
    offset: String(limit * page - limit),
    nameStartsWith: String(query.search || ''),
  };

  store.dispatch(getCharacters.initiate(queryParams));

  if (query.details) {
    store.dispatch(getCharacter.initiate(query.details));
  }

  const [mainData, detailData] = await Promise.all(store.dispatch(getRunningQueriesThunk())).then(
    (results) => {
      return results.map((result) => result?.data?.data);
    }
  );

  return {
    props: {
      mainData,
      detailData: detailData || {},
    },
  };
});
