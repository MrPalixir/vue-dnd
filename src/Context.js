export default class Context
{
    static instance = Context.instance || new Context();

    _listObserver = [];
    _data = {};
    _currentKey = 0;

    getCurrentKey = () => {return this._currentKey;}

    getPath = (key) => {return this._data[key];}

    setPath = (key, value) => {
        this._data[key] = value;
        this._currentKey++;
    }

    updatePath = (key, keyValue, value) => {
        this._data[key][keyValue] = value;
    }

    removePath = (key) => {delete this._data[key];}

    find = (fileName, id) => {
        var found = false;

        Object.keys(this._data).forEach((e, i) => {
            var split = e.split(",");

            // console.log(split, fileName, id);

            if(split[0] === fileName && split.includes(id))
            {
                found = true;
                return;
            }
        });

        return found;
    }

    displayPath = () => {console.log(this._data);}

    getListObserver = () => {
        return this._listObserver;
    };

    follow = (data) => {
        this._listObserver.push(data);
    };

    notify = async (type) => {
        await null;
        for (let i = 0; i < this._listObserver.length; i++) {
            if(this._listObserver[i].follow.some(item => type === item))
                this._listObserver[i].func.apply(null, [type]);
        }
    };

    unFollow = (data) => {
        for (let i = 0; i < this._listObserver.length; i++) {
            for(let j = 0; j < data.length; j++)
            {
                if(this._listObserver[i].follow.some(item => data[j] === item))
                {
                    for(let k = 0; k < this._listObserver[i].follow.length; k++)
                    {
                        if(data[j] === this._listObserver[i].follow[k])
                            this._listObserver[i].follow.splice(k, 1);
                    }
                }
            }

            if(this._listObserver[i].follow.length === 0)
                this._listObserver.splice(i, 1);
        }
    };
}