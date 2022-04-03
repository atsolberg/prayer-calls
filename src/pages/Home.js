import { useCalls } from "../providers/CallsProvider";
import FileCard from "../components/file-card/FileCard";

function Cards({ calls }) {
  return (
    <div className="mt-16 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {calls?.allIds?.length
        ? calls.allIds.map((id) => <FileCard key={id} file={calls.byId[id]} />)
        : null}
    </div>
  );
}

function Home() {
  const calls = useCalls();

  return (
    <div className="relative my-0 mx-auto w-11/12 md:w-10/12 lg:w-9/12">
      {calls.loaded ? <Cards calls={calls.entities} /> : null}
    </div>
  );
}

export default Home;
