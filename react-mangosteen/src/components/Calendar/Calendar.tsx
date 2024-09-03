import { useEffect, useState } from "react"
import { Time, time } from "../../library/Time"

export const Calendar: React.FC = () => {
  const [date, setDate] = useState<Time>(time())

  const handlePreMonth = () => {
    setDate(date.add(-1, "month").clone)
  }
  
  const handleNextMonth = () => {
    setDate(date.add(1, "month").clone)
  }

  return (
    <div>
      <header flex justify-between items-center p-16px>
        <span b-1 b-gray b-solid rounded-4px p-8px onClick={handlePreMonth}>&lt;</span>
        <span>{date.format("yyyy年MM月dd日")}</span>
        <span b-1 b-gray b-solid rounded-4px p-8px onClick={handleNextMonth}>&gt;</span>
      </header>
      <main w-screen children-w="[calc(100%/7)]" flex text-center>
        <div>日</div>
        <div>一</div>
        <div>二</div>
        <div>三</div>
        <div>四</div>
        <div>五</div>
        <div>六</div>
      </main>
      <footer w-screen children-w="[calc(100%/7)]" flex flex-wrap text-center children-p-y-8px>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>10</div>
        <div>11</div>
        <div>12</div>
        <div>13</div>
        <div>14</div>
        <div>15</div>
        <div>16</div>
        <div>17</div>
        <div>18</div>
        <div>19</div>
        <div>20</div>
        <div>21</div>
        <div>22</div>
        <div>23</div>
        <div>24</div>
        <div>25</div>
        <div>26</div>
        <div>27</div>
        <div>28</div>
        <div>29</div>
        <div>30</div>
      </footer>
    </div>
  )
}
