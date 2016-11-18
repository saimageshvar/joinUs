class JoinUsController < ApplicationController
	skip_before_filter  :verify_authenticity_token
	def index
		@tweets = Tweet.all.reverse
		@l = Like.last
		if !@l
			@l = Like.new
			@l.count = 0
			@l.save
		end

	end

	def create
		@tweet = Tweet.new
		@tweet.name = params[:name]
		@tweet.content = params[:content]
		if @tweet.save
			cookies[:isValid] = false
			redirect_to action: 'index'
		end
	end

	def count
		l = Like.last
		if !cookies[:liked]
			l.count = l.count + 1
		end
		l.save
		cookies[:liked] = true
	end
end
