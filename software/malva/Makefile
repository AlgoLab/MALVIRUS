CXXFLAGS=-Wno-char-subscripts -DNDEBUG -Wall -O3 -std=c++11 -I. -I${CONDA_PREFIX}/include -I${CONDA_PREFIX}/include/htslib -I${CONDA_PREFIX}/include/sdsl -march=core2
LIBS=-L${CONDA_PREFIX}/lib -lhts -lz -lsdsl -ldivsufsort -ldivsufsort64 -lkmc

.PHONY: all

all: malva-geno

malva-geno: main.o MurmurHash3.o
	@echo "* Linking $@"
	$(CXX) $(CXXFLAGS) $^ $(LIBS) -o $@

%.o: %.cpp
	@echo '* Compiling $<'
	$(CXX) $(CXXFLAGS) -o $@ -c $<

clean:
	rm -rf *.o
