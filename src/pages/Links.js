import A from "../components/anchor/A";

const links = [
  {
    category: "Word",
    links: [
      { label: "Rani Levi 2017", href: "https://vimeo.com/223071830" },
      { label: "Spirit Led I", href: "https://vimeo.com/87205217" },
      { label: "Spirit Led II", href: "https://vimeo.com/87483499" },
      { label: "Spirit Led III", href: "https://vimeo.com/87488790" },
      {
        label: "Overcoming Things",
        href: "https://youtu.be/jdqoNLy3cCY?t=3463",
      },
      {
        label: "2020 through 2021 “Years of Transition” - Dr. Billye Brim",
        href: "https://www.youtube.com/watch?v=XKzrcFBvq7M",
      },
      {
        label: "Healing KEH",
        href: "https://www.youtube.com/watch?v=9IfBOjoohx0",
      },
      {
        label: "Angels KEH",
        href: "https://www.youtube.com/watch?v=9CwtLWrkKU0",
      },
      {
        label: "Prophecies, Signs, and Events of the End Times I - Jim Hammond",
        href: "https://www.youtube.com/watch?v=3UXKhKu6lyw&list=PL7LE6jm_pt7xm4zHVUOTnzDFw-xydCkJZ",
      },
      {
        label: "It's Not a Faith Problem, It's Your Unbelief - Andrew Wommack",
        href: "https://www.youtube.com/watch?v=lq6YjjxUY5s",
      },
      {
        label: "Cooperate With the Laws of God - Andrew Wommack",
        href: "https://www.youtube.com/watch?v=d8B1mPbIbhg",
      },
      {
        label:
          '"The Believer\'s Authority Vol. 1" | Rev. Kenneth E. Hagin | *(Copyright Protected)',
        href: "https://www.youtube.com/watch?v=k4FJ4bJkyeo",
      },
      {
        label:
          "Kenneth E Hagin The Believer's Authority 02 Excercising Our Authority",
        href: "https://www.youtube.com/watch?v=7r6f6KtIEDY",
      },
      {
        label:
          "Kenneth E Hagin The Believer's Authority 03 Reigning with Our Authority 110288",
        href: "https://www.youtube.com/watch?v=pSxTerdtzcE",
      },
      {
        label:
          "Healing Scriptures Kenneth E Hagin 1 Reading From Believers Int Church Channel",
        href: "https://www.youtube.com/watch?v=1NOWuwHIgzs&feature=youtu.be",
      },
      {
        label: "Prayer for Charlie",
        href: "https://www.facebook.com/watch/live/?v=177832623791040&ref=watch_permalink",
      },
      {
        label: "Jesus, The High Priest of My Confession, Pt 2",
        href: "https://vimeo.com/180733886",
      },
      {
        label: "It's Not a Faith Problem, It's Your Unbelief",
        href: "https://vimeo.com/176625098",
      },
      {
        label: "Signs of the Times/The Blood Moon",
        href: "https://vimeo.com/140685390",
      },
      {
        label: "Christian Philosophy",
        href: "https://vimeo.com/134423079",
      },
      {
        label: "What Do the Prophets Say?",
        href: "https://vimeo.com/107725560",
      },
      {
        label: "Time and the Shemitah Cycle",
        href: "https://vimeo.com/107489165",
      },
      {
        label: "Faith and Vision Work Together",
        href: "https://vimeo.com/204929652",
      },
      {
        label: "About the Anointing III",
        href: "https://vimeo.com/302919513",
      },
      {
        label: "The Father's Love",
        href: "https://vimeo.com/281461807",
      },
      {
        label: "The Killer of Disappointment",
        href: "https://vimeo.com/308914003",
      },
    ],
  },
  {
    category: "Politics",
    links: [
      {
        label: "Prophecy about Shock and Awe, December to Remember",
        href: "https://www.youtube.com/watch?v=J5lb8CFgeDs",
      },
      {
        label:
          "God's Hand Is Moving! Hank Kunneman NEW Prophecy January 6th, 2021",
        href: "https://www.youtube.com/watch?v=TCUOqAuCVPo",
      },
      {
        label: "Kat Kerr Strong Prophetic Word about Trump",
        href: "https://www.youtube.com/watch?v=RcaN_Psinnk",
      },
      {
        label:
          "FlashPoint: The Prophetic Voices Speak VICTORY! | Dutch Sheets, Lance Wallnau, Kat Kerr, and more!",
        href: "https://www.youtube.com/watch?v=u7evOBf_E80",
      },
      {
        label:
          "FlashPoint: Watch God Move! Michele Bachmann, Lance Wallnau, Hank Kunneman, Mario Murillo",
        href: "https://youtu.be/voatjiGJPjY?t=2101",
      },
      {
        label: "FlashPoint: Trump Isn't Over, NEW EARTHQUAKE Prophecy",
        href: "https://www.youtube.com/watch?v=HSNpk9xhoeQ",
      },
      {
        label: "March 21",
        href: "https://youtu.be/KidWCbWv0Qo?t=2983",
      },
      {
        label: "flashpoint 8-1-21",
        href: "https://www.youtube.com/watch?v=po4H9xcGBe8",
      },
    ],
  },
  {
    category: "Finance",
    links: [
      {
        label: "Part 1: Developing a Wealth Mindset",
        href: "http://player.vimeo.com/video/34659915",
      },
      {
        label: "Part 2: Protecting Your Financial House &amp; Debt Elimination",
        href: "http://player.vimeo.com/video/34961791",
      },
      {
        label:
          "Part 3: Wealth Creation: Retirement Planning, Investments, &amp; Social Security",
        href: "http://player.vimeo.com/video/35325149",
      },
      {
        label: "Part 4: Estate &amp; Legacy Planning",
        href: "http://player.vimeo.com/video/35698422",
      },
    ],
  },
];

function Links() {
  return (
    <div className="my-0 mx-auto w-11/12 md:w-10/12 lg:w-9/12">
      <h2 className="mb-3 mt-4 text-gray-400 font-bold text-lg sm:text-xl">
        Aaron&apos;s Links
      </h2>
      {links.map((l) => (
        <div key={l.category}>
          <h2 className="mb-3 mt-4 text-gray-400 font-bold text-lg sm:text-xl">
            {l.category}
          </h2>
          {l.links.map((l) => (
            <p key={l.href}>
              <A href={l.href} target="_blank" rel="noreferrer">
                {l.label}
              </A>
            </p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Links;
