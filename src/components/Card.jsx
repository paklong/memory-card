export default function Card({ id, src, onClick, disable }) {
  return (
    <input
      type="image"
      className="m-4 rounded-lg max-w-36 border-8"
      src={src}
      onClick={() => onClick(id)}
      disabled={disable}
    />
  );
}
