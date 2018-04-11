var top250 = {
    init: function () {
        this.$element = $('#top250')

        this.index = 0
        this.isLoading = false
        this.isFinish = false

        this.bind()
        this.start()
    },
    bind: function () {
        console.log(this.$element)
        var that = this
        var clock
        this.$element.scroll(function () {
            if (clock) {
                clearTimeout(clock)
            }
            clock = setTimeout(function () {
                if (that.isToBottom())
                    that.start()
            }, 300)

        })
    },
    start: function () {
        console.log('start method.')
        this.getData(this.render)
    },
    getData: function (callback) {
        if (this.isLoading || this.isFinish) return
        this.isLoading = true
        var that = this
        this.$element.find('.loading').show()
        $.ajax({
            url: 'http://api.douban.com/v2/movie/top250',
            type: 'GET',
            data: {
                start: that.index
            },
            dataType: 'jsonp'
        }).done(function (ret) {
            console.log(ret)
            that.index += 20
            if (that.index >= ret.total) {
                that.isFinish = true
            }
            callback.call(that, ret)
        }).fail(function () {
            console.log('Ajax异常')
            alert('豆瓣接口故障 可能达到请求限制 请1分钟后再试')
        }).always(function () {
            that.isLoading = false
            that.$element.find('.loading').hide()
        })

    },
    render: function (data) {
        var that = this
        data.subjects.forEach(function (movie) {
            var tpl = `<div class="item">
              <a href="#">
                <div class="cover"><img src="" alt=""></div>
                <div class="detail">
                  <h2>电影标题</h2>
                  <div class="extra"><span class="score">9.3</span> <span class="collect"></span>  收藏</div>
                  <div class="extra"><span class="year"></span> <span class="type">剧情 爱情</span></div>
                  <div class="extra">导演: <span class="director">张艺谋</span></div>
                  <div class="extra">主演: <span class="actor"></span></div>
                </div>
              </a>
            </div>`
            var $node = $(tpl)
            $node.find('.cover img').attr('src', movie.images.small)
            $node.find('.detail h2').text(movie.title)
            $node.find('.score').text(movie.rating.average)
            $node.find('.collect').text(movie.collect_count)
            $node.find('.year').text(movie.year)
            $node.find('.type').text(movie.genres.join(' / '))
            $node.find('.director').text(function () {
                var directors = []
                movie.directors.forEach(function (item) {
                    directors.push(item.name)
                })
                return directors.join(', ')
            })
            $node.find('.actor').text(function (item) {
                var actors = []
                movie.casts.forEach(function (item) {
                    actors.push(item.name)
                })
                return actors.join(', ')
            })



            that.$element.find('.container').append($node)
        })
    },

    isToBottom: function () {
        return this.$element.height() - 20 <= this.$element.find('.container').height() +
            this.$element.find('.container').scrollTop()
    }
}

var usBox = {
    init: function () {
        console.log('usbox init.')

        this.$element = $('#usBox')

        this.index = 0
        this.isLoading = false
        this.isFinish = false

        this.bind()
        this.start()
    },
    bind: function () {
        console.log(this.$element)
        var that = this
        var clock
        this.$element.scroll(function () {
            if (clock) {
                clearTimeout(clock)
            }
            clock = setTimeout(function () {
                if (that.isToBottom())
                    that.start()
            }, 300)

        })
    },
    start: function () {
        console.log('usbox start.')
        this.getData(this.render)
    },
    getData: function (callback) {
        if (this.isLoading || this.isFinish) return
        this.isLoading = true
        var that = this
        this.$element.find('.loading').show()
        $.ajax({
            url: 'http://api.douban.com/v2/movie/us_box',
            type: 'GET',
            data: {
                start: that.index
            },
            dataType: 'jsonp'
        }).done(function (ret) {
            console.log(ret)
            that.index += 20
            if (that.index >= ret.total) {
                that.isFinish = true
            }
            callback.call(that, ret)
        }).fail(function () {
            console.log('Ajax异常')
            alert('豆瓣接口故障 可能达到请求限制 请1分钟后再试')
        }).always(function () {
            that.isLoading = false
            that.$element.find('.loading').hide()

        })

    },
    render: function (data) {
        var that = this
        data.subjects.forEach(function (movie) {
            var tpl = `<div class="item">
              <a href="#">
                <div class="cover"><img src="" alt=""></div>
                <div class="detail">
                  <h2>电影标题</h2>
                  <div class="extra"><span class="score">9.3</span> <span class="collect"></span>  收藏</div>
                  <div class="extra"><span class="year"></span> <span class="type">剧情 爱情</span></div>
                  <div class="extra">导演: <span class="director">张艺谋</span></div>
                  <div class="extra">主演: <span class="actor"></span></div>
                </div>
              </a>
            </div>`
            var $node = $(tpl)
            $node.find('.cover img').attr('src', movie.subject.images.small)
            $node.find('.detail h2').text(movie.subject.title)
            $node.find('.score').text(movie.subject.rating.average)
            $node.find('.collect').text(movie.subject.collect_count)
            $node.find('.year').text(movie.subject.year)
            $node.find('.type').text(movie.subject.genres.join(' / '))
            $node.find('.director').text(function () {
                var directors = []
                movie.subject.directors.forEach(function (item) {
                    directors.push(item.name)
                })
                return directors.join(', ')
            })
            $node.find('.actor').text(function (item) {
                var actors = []
                movie.subject.casts.forEach(function (item) {
                    actors.push(item.name)
                })
                return actors.join(', ')
            })



            that.$element.find('.container').append($node)
        })
    },

    isToBottom: function () {
        return this.$element.height() - 30 <= this.$element.find('.container').height() +
            this.$element.find('.container').scrollTop()
    }
}

var imdb250 = {
    init: function () {
        this.$element = $('#IMDBtop250')

        this.index = 1
        this.isLoading = false
        this.isFinish = false

        this.bind()
        this.start()
    },
    bind: function () {
        console.log(this.$element)
        var that = this
        var clock
        this.$element.scroll(function () {
            if (clock) {
                clearTimeout(clock)
            }
            clock = setTimeout(function () {
                if (that.isToBottom())
                    that.start()
            }, 300)

        })
    },
    start: function () {
        console.log('start method.')
        this.getData(this.render)
    },
    getData: function (callback) {
        if (this.isLoading || this.isFinish) return
        this.isLoading = true
        var that = this
        this.$element.find('.loading').show()
        $.ajax({
            url: 'http://api.myapifilms.com/imdb/top',
            type: 'GET',
            data: {
                start: that.index,
                end: that.index + 49,
                token: '68cc1b75-215f-4007-b886-469d007385af',
                format: 'json',
                data: 1
            },
            dataType: 'jsonp'
        }).done(function (ret) {
            console.log(ret)
            if (ret.error) {
                alert()
            }
            else {
                that.index += 50
                if (that.index >= 250) {
                    that.isFinish = true
                }
                callback.call(that, ret)
            }

        }).fail(function () {
            console.log('Ajax请求异常')
        }).always(function () {
            that.isLoading = false
            that.$element.find('.loading').hide()

        })

    },
    render: function (data) {
        var that = this
        this.datadata = data
        data.data.movies.forEach(function (movie) {
            var tpl = `<div class="item">
              <a href="#">
                <div class="cover"><img src="" alt=""></div>
                <div class="detail">
                  <h2>电影标题</h2>
                  <div class="extra"><span class="score">9.3</span> <span class="collect"></span>  评价</div>
                  <div class="extra"><span class="year"></span> <span class="type">剧情 爱情</span></div>
                  <div class="extra">导演: <span class="director">张艺谋</span></div>
                  <div class="extra">编剧: <span class="actor"></span></div>
                </div>
              </a>
            </div>`
            var $node = $(tpl)
            $node.find('.cover img').attr('src', movie.urlPoster)
            $node.find('.detail h2').text(movie.title)
            $node.find('.score').text(movie.rating)
            $node.find('.collect').text(movie.votes)
            $node.find('.year').text(movie.year)
            $node.find('.type').text(movie.genres.join(' / '))
            $node.find('.director').text(function () {
                var directors = []
                movie.directors.forEach(function (item) {
                    directors.push(item.name)
                })
                return directors.join(', ')
            })
            $node.find('.actor').text(function (item) {
                var actors = []
                movie.writers.forEach(function (item) {
                    actors.push(item.name)
                })
                return actors.join(', ')
            })



            that.$element.find('.container').append($node)
        })
    },

    isToBottom: function () {
        return this.$element.height() - 20 <= this.$element.find('.container').height() +
            this.$element.find('.container').scrollTop()
    }
}

var search = {
    init: function () {
        this.$element = $('#search')
        this.bind()
        // this.start()
        this.isLoading = false
        this.keyword = ''
    },
    bind: function () {
        var that = this
        this.$element.find('.search-button').click(function () {
            console.log('click.')
            that.keyword = that.$element.find('input').val()
            that.start();
        })
    },
    start: function () {
        this.getData(this.render)
    },

    getData: function (callback) {
        if (this.isLoading) return
        this.isLoading = true
        var that = this
        this.$element.find('.loading').show()
        $.ajax({
            url: 'http://api.douban.com/v2/movie/search',
            type: 'GET',
            data: {
                q: that.keyword
            },
            dataType: 'jsonp'
        }).done(function (ret) {
            console.log(ret)
            callback.call(that, ret)
        }).fail(function () {
            console.log('Ajax异常')
        }).always(function () {
            that.isLoading = false
            that.$element.find('.loading').hide()

        })

    },
    render: function (data) {
        var that = this
        that.$element.find('.container').children().remove()
        data.subjects.forEach(function (movie) {
            var tpl = `<div class="item">
              <a href="#">
                <div class="cover"><img src="" alt=""></div>
                <div class="detail">
                  <h2>电影标题</h2>
                  <div class="extra"><span class="score">9.3</span> <span class="collect"></span>  收藏</div>
                  <div class="extra"><span class="year"></span> <span class="type">剧情 爱情</span></div>
                  <div class="extra">导演: <span class="director">张艺谋</span></div>
                  <div class="extra">主演: <span class="actor"></span></div>
                </div>
              </a>
            </div>`
            var $node = $(tpl)
            $node.find('.cover img').attr('src', movie.images.medium)
            $node.find('.detail h2').text(movie.title)
            $node.find('.score').text(movie.rating.average)
            $node.find('.collect').text(movie.collect_count)
            $node.find('.year').text(movie.year)
            $node.find('.type').text(movie.genres.join(' / '))
            $node.find('.director').text(function () {
                var directors = []
                movie.directors.forEach(function (item) {
                    directors.push(item.name)
                })
                return directors.join(', ')
            })
            $node.find('.actor').text(function (item) {
                var actors = []
                movie.casts.forEach(function (item) {
                    actors.push(item.name)
                })
                return actors.join(', ')
            })


            that.$element.find('.container').append($node)
        })
    },

}

var app = {
    init: function () {
        this.$tabs = $('footer>div')
        this.$panels = $('section')
        this.bind()

        top250.init()
        usBox.init()
        imdb250.init()
        search.init()

    },
    bind: function () {
        var that = this
        this.$tabs.click(function () {
            var index = $(this).index()
            that.$panels.hide().eq(index).fadeIn()
            $(this).addClass('active').siblings().removeClass('active')
        })
        // window.ontouchmove = function(e){
        //   e.preventDefault()
        // }
        // $('section').each(function(){
        //   this.ontouchmove = function(e){
        //     e.stopPropagation()
        //   }
        // })
    }
}

var detail = {
    
}

app.init()