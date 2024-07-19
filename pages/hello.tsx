const Hello = ({ data }) => {
  return <>index{JSON.stringify(data)}22</>;
};


export async function getServerSideProps() {
  const response = await fetch('http://localhost:3001/api/users');
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
}


export default Hello;