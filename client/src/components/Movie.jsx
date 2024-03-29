import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Movie() {
    const [form, setForm] = useState({
        titre:"",
        resume:"",
        real:"",
        year:"",
        stream:""
    });
    const [isNew, setIsNew] = useState(true);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const id = params.id?.toString() || undefined;
            if(!id) return;
            setIsNew(false);
            const response = await fetch(`http://localhost:5050/movie/${params.id.toString()}`);
            if(!response.ok){
                const message = `An error has occured: ${response.statusText}`;
                console.error(message);
                return;
            }
            const movie = await response.json();
            if(!movie) {
                console.warn(`Movie with id ${id} not found`);
                navigate("/");
                return;
            }

            setForm(movie);
        }
        fetchData();
        return;
    }, [params.id, navigate]);

    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value};
        });
    }

    async function onSubmit(e) {
        e.preventDefault();
        const film = { ...form };
        try {
            let response;
            if(isNew) {
                response = await fetch("http://localhost:5050/movie", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(film),
                  });
            } else {
                response = await fetch(`http://localhost:5050/movie/${params.id}`, {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(film),
                  });
            }
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error("A problem occured with your fetch operation :", error);
        } finally {
            setForm({titre:"",resume:"",real:"",year:"",stream:""});
            navigate("/");
        }
    }

    return (
        <>
        <h3 className="text-lg font-semibold p-4">Create/Update Movie </h3>
        <form
          onSubmit={onSubmit}
          className="border rounded-lg overflow-hidden p-4"
        >
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-slate-900/10 pb-12 md:grid-cols-2">
            <div>
              <h2 className="text-base font-semibold leading-7 text-slate-900">
                Movie Info
              </h2>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                This information will be displayed publicly so be careful what you
                share.<br />
                (* = required answer)
              </p>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 ">
            <div className="sm:col-span-4">
              <label
                htmlFor="titre"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Title *
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="titre"
                    id="titre"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Original title or french title"
                    required
                    value={form.titre}
                    onChange={(e) => updateForm({ titre: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="resume"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Plot *
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="resume"
                    id="resume"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Min one sentence please - Max 500 characters"
                    maxLength="500"
                    required
                    value={form.resume}
                    onChange={(e) => updateForm({ resume: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="real"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Director *
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="real"
                    id="real"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="It could be severals directors"
                    required
                    value={form.real}
                    onChange={(e) => updateForm({ real: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="year"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Release year
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="year"
                    id="year"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="The original country release year or the french release year"
                    value={form.year}
                    onChange={(e) => updateForm({ year: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="stream"
                className="block text-sm font-medium leading-6 text-slate-900"
              >
                Streaming link
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-slate-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="url"
                    name="stream"
                    id="stream"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Please be carefull about your source"
                    value={form.stream}
                    onChange={(e) => updateForm({ stream: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <input
          type="submit"
          value="Save Movie"
          className="inline-flex items-center justify-center whitespace-nowrap text-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-purple-400  hover:text-accent-foreground h-9 rounded-md px-3 cursor-pointer mt-4"
            />
            </div>
        </div>
      </form>
    </>
  );
}
