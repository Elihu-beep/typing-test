
export function Header() {
    return(
        <header>
        <nav className='AppNav'>
          <ul className='LeftNav'>
            <li>Typing-test</li>
          </ul>
          <ul className='RightNav'>
            <li>30sec</li>
            <li>60sec</li>
            <li className='Reset'>Reset</li>
          </ul>
        </nav>
      </header>
    )
}