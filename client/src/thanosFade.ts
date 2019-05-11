import "./styles.scss";

export default (id: string) => {
    const target = document.getElementById(`${id}`)!;
    target.classList.add("ready-fade");
    target.classList.add("thanos-fade");
    document.querySelector("#create-stream")!.classList.add("raise");
}