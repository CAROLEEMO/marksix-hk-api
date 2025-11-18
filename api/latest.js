export default async function handler(req, res) {
  const raw = await fetch("https://marksix6.net/index.php?api=1");
  const data = await raw.json();

  const hk = data.lottery_data.find(item => item.code === "hk" && !item.error);
  if (!hk) {
    return res.status(500).json({ error: "香港彩数据不可用" });
  }

  res.status(200).json({
    expect: hk.expect,
    numbers: hk.numbers.slice(0, 6),
    special: hk.numbers[6] || "",
    openTime: hk.openTime || ""
  });
}
