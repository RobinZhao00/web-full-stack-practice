// @ts-ignore
const Hello = ({ data }) => {
  return <div className="hello">
    index{JSON.stringify(data)}22
  </div>;
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